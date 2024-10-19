const mongoose = require("mongoose");
const mailSender = require("../utils/Mailsender");

const otpSchema = new mongoose.Schema({
    companyEmail: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

async function sendVarificationMail(companyEmail, otp) {
  try {
    const mailResponse = await mailSender(
        companyEmail,
      "OTP for Email Verification",
        `Your OTP for email verification is ${otp}`
    );

    console.log("Email sent successfully", mailResponse)

  } catch (error) {
    console.log("error occur in sending mail", error);
  }
}

otpSchema.pre("save", async function (next){
    await sendVarificationMail(this.companyEmail, this.otp);
} )

module.exports = mongoose.model("OTP", otpSchema);
