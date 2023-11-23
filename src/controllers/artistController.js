import Artist from '../models/artist.js';

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
    res
      .status(artist ? 200 : 404)
      .json(artist || {message: 'Artist not found'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateArtist = async (req, res) => {
  try {
    const [updated] = await Artist.update(req.body, {
      where: {id: req.params.id},
    });
    res.status(updated ? 200 : 404).json({
      message: updated ? 'Artist updated successfully' : 'Artist not found',
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const deleted = await Artist.destroy({where: {id: req.params.id}});
    res.status(deleted ? 200 : 404).json({
      message: deleted ? 'Artist deleted successfully' : 'Artist not found',
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
