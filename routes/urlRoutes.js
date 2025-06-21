import express from 'express';
import validUrl from 'valid-url';
import shortid from 'shortid';
import config from 'config';
import Url from '../models/Url.js';

const router = express.Router();

// @route POST -> /api/url/shorten
// @desc Create short URL

const getShorten = router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl');

    // check for valid base Url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base Url');
    }

    // Create url Code
    const urlCode = shortid.generate();

    // check long Url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl});

            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(401).json('Invalid long Url');
    }
})

export default getShorten;