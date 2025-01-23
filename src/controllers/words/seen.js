const UserWord = require('../../models/words/user-words');
const Word = require('../../models/words/all-words');

const markWordAsSeen = async (req, res) => {
    try {
        const { wordId } = req.params;
        const userId = req.user.id; // Assuming auth middleware adds user to req

        // Validate word exists
        const word = await Word.findById(wordId);
        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }

        // Check if word is already in user's collection
        let userWord = await UserWord.findOne({ user: userId, word: wordId });
        
        if (userWord) {
            // Update existing record
            userWord.progress.lastReviewDate = new Date();
            userWord.progress.correctCount += 1;
            await userWord.save();
        } else {
            // Create new user-word record
            userWord = await UserWord.create({
                user: userId,
                word: wordId,
                progress: {
                    status: 'learning',
                    lastReviewDate: new Date(),
                    correctCount: 1
                }
            });
        }

        res.status(200).json({
            success: true,
            data: userWord
        });

    } catch (error) {
        console.error('Error marking word as seen:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking word as seen',
            error: error.message
        });
    }
};

module.exports = markWordAsSeen;