import { User } from '../models/index.js';

/**
 * Get all users
 * @route GET /api/users
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from response
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * Get user count
 * @route GET /api/users/count
 */
export const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * Update user by ID
 * @route PUT /api/users/:id
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Don't allow password updates through this route
        delete updateData.password;

        const user = await User.findByIdAndUpdate(
            id,
            { ...updateData,
                 updated_at: Date.now() 
            },

            { new: true, 
                runValidators: true 
            }
            
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * Delete user by ID
 * @route DELETE /api/users/:id
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

