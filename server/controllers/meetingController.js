const Meeting = require('../models/Meeting');

const meetingController = {
  getAllMeetings: (req, res) => {
    Meeting.getAll((err, meetings) => {
      if (err) {
        console.error('Error getting all meetings:', err);
        return res.status(500).json({ error: err });
      }
      res.json(meetings);
    });
  },
  getMeetingById: (req, res) => {
    const id = req.params.id;
    Meeting.getById(id, (err, meeting) => {
      if (err) {
        console.error(`Error getting meeting with ID ${id}:`, err);
        return res.status(500).json({ error: err });
      }
      res.json(meeting);
    });
  },
  createMeeting: (req, res) => {
    const meeting = req.body;
    Meeting.create(meeting, (err, meetingId) => {
      if (err) {
        console.error('Error creating meeting:', err);
        return res.status(500).json({ error: err });
      }
      try {
        global.io.emit('meetingCreated', { id: meetingId, ...meeting });
      } catch (emitErr) {
        console.error('Error emitting meetingCreated event:', emitErr);
      }
      res.status(201).json({ id: meetingId });
    });
  },
  updateMeeting: (req, res) => {
    const id = req.params.id;
    const meeting = req.body;
    Meeting.update(id, meeting, (err, results) => {
      if (err) {
        console.error(`Error updating meeting with ID ${id}:`, err);
        return res.status(500).json({ error: err });
      }
      try {
        global.io.emit('meetingUpdated', { id, ...meeting });
      } catch (emitErr) {
        console.error('Error emitting meetingUpdated event:', emitErr);
      }
      res.json(results);
    });
  },
  deleteMeeting: (req, res) => {
    const id = req.params.id;
    Meeting.delete(id, (err, results) => {
      if (err) {
        console.error(`Error deleting meeting with ID ${id}:`, err);
        return res.status(500).json({ error: err });
      }
      try {
        global.io.emit('meetingDeleted', { id });
      } catch (emitErr) {
        console.error('Error emitting meetingDeleted event:', emitErr);
      }
      res.status(204).send();
    });
  }
};

module.exports = meetingController;
