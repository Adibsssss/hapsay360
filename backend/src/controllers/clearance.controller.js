import { User, Officer, ClearanceApplication } from '../models/index.js';


/**
 * 
 * @route POST /api/clearances
 * Create a new clearance application
 */
export const createClearance = async (req, res) => {
    try {
        const { userId, purpose } = req.body;
        if (!userId || !purpose) {
            return res.status(400).json({
                success: false,
                message: 'User ID and purpose are required'
            });
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const clearance = new ClearanceApplication({
            user_id: userId,
            purpose,
        });

        await clearance.save();

        res.status(201).json({
            success: true,
            data: clearance
        })

    } catch (error) {
        console.error('Error creating clearance:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * 
 * @route GET /api/clearances
 * Get all clearances
 */
export const getAllClearances = async (req, res) => {
    try {
        const clearances = await ClearanceApplication.find().populate('user_id', '-password');
        res.status(200).json({
            success: true,
            count: clearances.length,
            data: clearances
        });
    } catch (error) {
        console.error('Error fetching clearances:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
