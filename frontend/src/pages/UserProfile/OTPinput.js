// import React from "react";
// import { useState } from "react";
// import { useContext } from "react";
// import { RecoveryContext } from "../App";
// import { TextField, Button, Typography, Grid, Link } from "@mui/material";
// import axios from "axios";

// const OTPSent = () => {
//   const { email, otp, setPage } = useContext(RecoveryContext);
//   const [timerCount, setTimer] = React.useState(60);
//   const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
//   const [disable, setDisable] = useState(true);

//   function resendOTP() {
//     if (disable) return;
//     axios
//       .post("http://localhost:5000/send_recovery_email", {
//         OTP: otp,
//         recipient_email: email,
//       })
//       .then(() => setDisable(true))
//       .then(() => alert("A new OTP has succesfully been sent to your email."))
//       .then(() => setTimer(60))
//       .catch(console.log);
//   }

//   function verfiyOTP() {
//     if (parseInt(OTPinput.join("")) === otp) {
//       setPage("reset");
//       return;
//     }
//     alert(
//       "The code you have entered is not correct, try again or re-send the link"
//     );
//     return;
//   }

//   React.useEffect(() => {
//     let interval = setInterval(() => {
//       setTimer((lastTimerCount) => {
//         lastTimerCount <= 1 && clearInterval(interval);
//         if (lastTimerCount <= 1) setDisable(false);
//         if (lastTimerCount <= 0) return lastTimerCount;
//         return lastTimerCount - 1;
//       });
//     }, 1000); //each count lasts for a second
//     //cleanup the interval on complete
//     return () => clearInterval(interval);
//   }, [disable]);

//   return (
//     <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12} sm={8} md={6} lg={4}>
//           <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//             <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//               <div className="flex flex-col items-center justify-center text-center space-y-2">
//                 <Typography variant="h4" fontWeight="bold">
//                   Email Verification
//                 </Typography>
//                 <Typography variant="subtitle1" color="textSecondary">
//                   We have sent a code to your email {email}
//                 </Typography>
//               </div>

//               <form>
//                 <div className="flex flex-col space-y-16">
//                   <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
//                     {Array.from({ length: 4 }).map((_, index) => (
//                       <Grid item xs={3} key={index}>
//                         <TextField
//                           fullWidth
//                           variant="outlined"
//                           inputProps={{ maxLength: 1 }}
//                           onChange={(e) =>
//                             setOTPinput((prev) => [
//                               ...prev.slice(0, index),
//                               e.target.value,
//                               ...prev.slice(index + 1),
//                             ])
//                           }
//                         />
//                       </Grid>
//                     ))}
//                   </div>

//                   <div className="flex flex-col space-y-5">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={verfiyOTP}
//                     >
//                       Verify Account
//                     </Button>

//                     <Typography variant="body2" color="textSecondary">
//                       Didn't receive the code?{" "}
//                       <Link
//                         component="button"
//                         onClick={resendOTP}
//                         style={{
//                           color: disable ? "grey" : "blue",
//                           cursor: disable ? "not-allowed" : "pointer",
//                           textDecoration:
//                             disable ? "none" : "underline blue",
//                         }}
//                       >
//                         {disable
//                           ? `Resend OTP in ${timerCount}s`
//                           : "Resend OTP"}
//                       </Link>
//                     </Typography>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default OTPSent;
