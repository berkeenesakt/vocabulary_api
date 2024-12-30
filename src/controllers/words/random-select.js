const Word = require('../../models/words/all-words');

const getRandomWord = async (req, res) => {
    try {
        // Get total count of documents
        const count = await Word.countDocuments();
        
        // Generate random index
        const random = Math.floor(Math.random() * count);
        
        // Get random document
        const randomWord = await Word.findOne().skip(random);
        
        if (!randomWord) {
            return res.status(404).json({ message: 'No words found in database' });
        }

        res.status(200).json({
            message: 'Random word retrieved successfully',
            word: randomWord
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = getRandomWord;