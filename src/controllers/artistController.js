import Artist from '../models/artist';

export const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({message: 'Artist not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.update(req.body, {
      where: {id: req.params.id},
    });
    if (artist[0] === 1) {
      res.status(200).json({message: 'Artist updated successfully'});
    } else {
      res.status(404).json({message: 'Artist not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.destroy({
      where: {id: req.params.id},
    });
    if (artist === 1) {
      res.status(200).json({message: 'Artist deleted successfully'});
    } else {
      res.status(404).json({message: 'Artist not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
