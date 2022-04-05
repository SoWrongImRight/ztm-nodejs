const { getAllLaunches, addNewLaunch } = require('../../models/launch.models');

function httpGetAllLaunches(req, res) {
  
  return res.status(200).json(Array.from(getAllLaunches()))
}

function httpAddNewLaunch(req,res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing needed data."
    })
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === 'Invalid Date') {
    res.status(400).json({
      error: "Invalid Launch Date"
    })
  }

  addNewLaunch(launch);
  res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  return res.status(404).json({
    error: "Launch not found"
  });

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  addNewLaunch,
}