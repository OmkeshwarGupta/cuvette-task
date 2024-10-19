const Job = require('../models/Job');
const nodemailer = require('nodemailer');
const User = require('../models/User');

require('dotenv').config();

// Create Job Posting
exports.createJob = async (req, res) => {
    const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
    try {
        const newJob = new Job({
            jobTitle,
            jobDescription,
            experienceLevel,
            candidates,
            endDate,
            createdBy: req.user.id
        });
        const job = await newJob.save();

        // update in user Db

        const updatedUser= await User.findByIdAndUpdate(req.user.id, { $push: { jobs: job._id } });
        console.log(updatedUser);
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Send Job Email Automation
exports.sendJobEmail = async (req, res) => {
    const { jobId } = req.body;
    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: job.candidates.join(','),
            subject: `Job Opening: ${job.jobTitle}`,
            text: `Job Details:\nTitle: ${job.jobTitle}\nDescription: ${job.jobDescription}\nExperience Level: ${job.experienceLevel}\nEnd Date: ${job.endDate}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Failed to send emails');
            } else {
                res.json({ msg: 'Emails sent successfully' });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
