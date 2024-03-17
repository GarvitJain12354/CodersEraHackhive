const { default: axios } = require("axios");
const errorHanler = require("../error/errorHandler");
const { sendToken } = require("../jwt/sendToken");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const User = require("../models/userModel");
const { sendmail } = require("../nodemailer/nodemailer");
const imagekit = require("../middlewares/imagekit").initimagekit();
const path = require("path");
const Vichel = require("../models/VechielModel");

exports.homepage = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.find().exec();

  res.json({ message: "This is User Data", studentData });
});
exports.login = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await new User(req.body).save();
  //    res.status(201).json(studentModel)
  sendToken(studentModel, 200, res);
});
exports.studentData = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await User.findById(req.id).exec();
  res.json(studentModel);
});
exports.signin = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!studentModel) return next(new errorHanler("User not found", 500));
  const isMatch = studentModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));

  sendToken(studentModel, 201, res);
});
exports.signout = CatchAsyncErrors(async (req, res, next) => {
  res.clearCookie("studentToken");
  res.json({ message: "Sign Out" });
});
exports.sendMail = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findOne({ email: req.body.email }).exec();
  console.log(studentData);
  if (!studentData) {
    return next(new errorHanler("User with this email does not exist ", 404));
  }
  const url = `http://localhost:3000/User/forgetlink/${studentData._id}`;
  studentData.resetpasswordToken = "1";
  studentData.save();
  console.log(studentData.resetpasswordToken);

  sendmail(req, res, next, url);
  res.json({ studentData, url });
});
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findById({ _id: req.params.id }).exec();

  if (!studentData) {
    next(new errorHanler("User not exist"), 500);
  }

  if (studentData.resetpasswordToken === "1") {
    studentData.password = req.body.password;
    studentData.resetpasswordToken = "0";
    studentData.save();

    res.status(200).json({
      message: "Password Change Succesfully",
    });
  } else {
    res.status(400).json({
      message: "Link Expired",
    });
  }
});
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const studentData = await User.findById({ _id: req.id }).select("+password");
  const isMatch = studentData.comparepassword(req.body.oldpassword);
  console.log(studentData);
  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (isMatch) {
    studentData.password = req.body.newpassword;
    await studentData.save();
    sendToken(studentData, 201, res);
  }
  res.status(200).json({ message: "Password is changed succesfully" });
});

exports.getLocation = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const fetchData = async () => {
            try {
              const response = await axios.get(
                "https://api.opencagedata.com/geocode/v1/json",
                {
                  params: {
                    q: "Ashoka Garden Bhopal",
                    key: "0d7e184e4e574cdf91143c8be28e5fd7",
                  },
                }
              );
              if (response.data) {
                const { lat, lng } = response.data.results[0].bounds.northeast;
                res.status(200).json({
                    lat,lng
                })
              } else {
                res.status(404).json({
                    message:"No data found"
                })
              }
            } catch (error) {
                res.status(404).json({
                    message:"Error fetching data"
                })
    
            }
          };
          fetchData()

    } catch (error) {
        console.log(error);
    }
})

exports.uploadCsv = CatchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.body);
      const jsonData = req.body;
      
      const dataByDevice = {};

      jsonData.forEach((entry) => {
          const deviceId = entry["Device ID"];
          if (!dataByDevice[deviceId]) {
              dataByDevice[deviceId] = [];
          }
          delete entry["Device ID"]; 
          dataByDevice[deviceId].push(entry);
      });

      for (const deviceId in dataByDevice) {
          const newDataEntry = {
              deviceId,
              data: dataByDevice[deviceId]
          };
          try {
              await Vichel.create(newDataEntry);
              console.log(`Data for deviceId ${deviceId} saved successfully.`);
          } catch (error) {
              console.error(`Error saving data for deviceId ${deviceId}:`, error);
          }
      }

      res.status(200).json({ success: true, message: "JSON data uploaded and processed successfully" });
  } catch (error) {
      console.error("Error uploading JSON data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});

exports.getDevice = CatchAsyncErrors(async (req, res, next) => {
  try {
      // const deviceId = req.params.id; // Update deviceId as needed
      // const vichel = await Vichel.findById(deviceId);

      // if (!vichel) {
      //     return res.status(404).json({ error: "Device not found" });
      // }

      // // Check if data field exists and has at least one entry
      // if (!vichel.data || vichel.data.length === 0) {
      //     return res.status(404).json({ error: "Data not found for the device" });
      // }

      // // Check if _id field is defined in at least one entry
      // const hasIdField = vichel.data.some(entry => entry._id !== undefined);

      // if (hasIdField) {
      //     // Sort data array based on _id field
      //     vichel.data.sort((a, b) => (a._id || '').localeCompare(b._id || ''));
      // } else {
      //     // Sort data array based on another field or skip sorting
      //     // Example: vichel.data.sort((a, b) => a.UTC - b.UTC);
      // }

      // // Extract coordinates from data field
      // const coordinates = vichel.data.map(entry => [parseFloat(entry.Latitude), parseFloat(entry.Longitude)]);

      // // TSP Calculation Logic
      // function calculateDistance(lat1, lon1, lat2, lon2) {
      //     const R = 6371; // Radius of the Earth in km
      //     const dLat = toRadians(lat2 - lat1);
      //     const dLon = toRadians(lon2 - lon1);
      //     const a =
      //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      //         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
      //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //     const distance = R * c; // Distance in km
      //     return distance;
      // }

      // function toRadians(degrees) {
      //     return degrees * (Math.PI / 180);
      // }

      // function bruteForceTSP(coordinates) {
      //     const n = coordinates.length;
      //     let minPath = [];
      //     let minDistance = Number.MAX_SAFE_INTEGER;

      //     const permute = (a, size) => {
      //         if (size === 1) {
      //             let distance = 0;
      //             for (let i = 0; i < n - 1; i++) {
      //                 distance += calculateDistance(
      //                     coordinates[a[i]][0], coordinates[a[i]][1],
      //                     coordinates[a[i + 1]][0], coordinates[a[i + 1]][1]
      //                 );
      //             }
      //             distance += calculateDistance(
      //                 coordinates[a[n - 1]][0], coordinates[a[n - 1]][1],
      //                 coordinates[a[0]][0], coordinates[a[0]][1]
      //             );
      //             if (distance < minDistance) {
      //                 minDistance = distance;
      //                 minPath = [...a];
      //             }
      //         } else {
      //             for (let i = 0; i < size; i++) {
      //                 permute(a, size - 1);
      //                 if (size % 2 === 1) {
      //                     const temp = a[i];
      //                     a[i] = a[size - 1];
      //                     a[size - 1] = temp;
      //                 } else {
      //                     const temp = a[0];
      //                     a[0] = a[size - 1];
      //                     a[size - 1] = temp;
      //                 }
      //             }
      //         }
      //     };

      //     const indexes = Array.from(Array(n).keys());
      //     permute(indexes, n);
      //     return minPath.map(index => coordinates[index]);
      // }

      // const shortestPath = bruteForceTSP(coordinates);
      // console.log("Shortest path:", shortestPath);
const vichel = await Vichel.findOne({deviceId:req.params.id})
      // Return sorted data and shortest path
      res.status(200).json({
          vichel
      });

  } catch (error) {
      // Error handling
      res.status(500).json({
          error: error.message
      });
  }
});
