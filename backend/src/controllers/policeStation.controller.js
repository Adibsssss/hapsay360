import { Officer, PoliceStation } from "../models/index.js";

export const createPoliceStation = async (req, res) => {
    try {
        const { name, address, phoneNumber, email, landline, officerId } = req.body;
        
        if(!name || !address || !phoneNumber || !landline || !email || !officerId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const officer = await Officer.findOne({ _id: officerId });
        if(!officer) {
            return res.status(404).json({ error: "Officer not found" });
        }
        
        const newPoliceStation = new PoliceStation(
            { name, 
              address, 
              contact: { phone_number: phoneNumber, email, landline },
              officer_IDs: [officer._id]
            });

        await newPoliceStation.save();
        
        res.status(201).json({
            success: true,
            data: newPoliceStation
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};


