const express = require("express");
const router = express.Router();
const Notes = require("../model/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//FETCH ALL THE NOTES OF THE SPECIFIC USER -->USER IS FETCH FROM THE MIDDLEWARE fetchUser
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const fetchedNotes = await Notes.find({ user: req.user.id });
    res.status(200).json({ success: true, message: fetchedNotes });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Sever Error", error: err });
  }
});

// ROUTE 2 :GET ALL NEW NOTE USING  POST :  "API/AUTH/ADD NOTE" LOGIN REQUIRE
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be at least 3 character").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.status(400).json({ success: true, message: savedNote });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Sever Error", error: err });
    }
  }
);

// UPDATING THE EXISTING NOTE  POST "API/NOTE/UPDATENOTE/:ID"  LOGIN REQUIRED

router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Title must be at least 3 character").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, description, tag } = req.body;
    //create new note object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note to be update it
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ success: false, error: "Not found" });
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(404).json({ success: false, error: "Not allowed" });
      }
      const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newnote },
        { new: true }
      );
      return res.status(200).json({ success: true, message: updatedNote });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Sever Error", error: err });
    }
  }
);

// UPDATING THE EXISTING NOTE  USING DELETE METHOD "API/NOTE/DELETE/:ID"  LOGIN REQUIRED

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //find the note to be update it
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    // CHECKING WHETHER  THE USER WHO IS TRYING TO DELETE THE POST OWNS THE NOTE OR NOT

    if (note.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, error: "Not allowed" });
    }
    const updatedNote = await Notes.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: updatedNote });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever Error", error: err });
  }
});

module.exports = router;
