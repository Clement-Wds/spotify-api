import express from 'express';
import {Music, Playlist} from '../models/initModels.js';

// Create a new playlist
const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Get a playlist by id with its music
const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [
        {
          model: Music,
          as: 'music',
        },
      ],
    });
    if (!playlist) return res.status(404).json({message: 'Playlist not found'});
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update a playlist by id
const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({message: 'Playlist not found'});
    await playlist.update(req.body);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete a playlist by id
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({message: 'Playlist not found'});
    await playlist.destroy();
    res.status(200).json({message: 'Playlist deleted'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Add a music to a playlist
const addMusicToPlaylist = async (req, res) => {
  try {
    const music = await Music.findByPk(req.body.musicId);
    if (!music) return res.status(404).json({message: 'Music not found'});
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({message: 'Playlist not found'});
    await music.update({playlist_id: req.params.id});
    res.status(200).json({message: 'Music added to playlist'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Remove a music from a playlist
const removeMusicFromPlaylist = async (req, res) => {
  try {
    const music = await Music.findByPk(req.body.musicId);
    if (!music) return res.status(404).json({message: 'Music not found'});
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({message: 'Playlist not found'});
    await music.update({playlist_id: null});
    res.status(200).json({message: 'Music removed from playlist'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

export {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
};
