import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

// @route GET /:code
// @desc Redirect to long Url

const redirect = router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code});

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No Url found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

export default redirect;