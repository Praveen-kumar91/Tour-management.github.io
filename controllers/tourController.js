
import Tour from '../models/Tour.js';
// import Tour from '../models/Tour.js';


// create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res
        .status(200)
        .json({
            success: true,
            massage: "Successfully created",
            data: savedTour,
        });

    } catch (err){
        res
        .status(500)
        .json({
            success: false,
            massage: "Failed to create. Try again" });
    }
};

// update tour
export const updatedTour = async (req, res) =>{
    const id = req.params.id;
    try{
        const updatedTour = await Tour.findByIdAndUpdate(id, {$set: req.body
        },
         {new:true})
        res
        .status(200)
        .json({
            success: true,
            massage: "Successfully updated",
            data: updatedTour,
        });


    } catch (err) {
        res.status(500).json({
            success: false,
            massage: "failed to update",
            
        });
    }
};

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedTour = await Tour.findByIdAndDelete(id);
        res
        .status(200).json({
            success: true,
            massage: "Successfully deleted",
         });
    } catch (err) {
        res.status(500).json({
            success: false,
            massage: "failed to delete",
            
        });
    }
};

// getSingle tour 
export const getSingleTour = async(req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate("reviews");

        res.status(200).json({
            success: true,
            massage: "Successfully deleted",
            data:tour,
         });
    } catch (err) {
        res.status(404).json({
            success: false,
            massage: "not found",
            
        });
    }
};


// getAll tour
export const getAllTour = async(req, res) => {
   
    


    // for pagination
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8);

        res.status(200)
        .json({
            success: true,
            count: tours.length,
            massage: "Successful",
            data: tours,
        })

    } catch (err) {
        res
        .status(404)
        .json({
            success: false,
            massage: "not found",
            
        });
    }
}

// get tour by serach
export const getTourBySearch = async(req,res)=>{

    // here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt (req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    

    try {

        // gte means greater than equal
        const tours = await Tour.find({ 
            city, 
            distance: { $gte: distance},
        maxGroupSize: { $gte: maxGroupSize } 
        }).populate("reviews");
        // console.log(tours)

        res.status(200)
        .json({
            success: true,
            massage: "Successful",
            data: tours
        });
        
    } catch (err) {
        // console.log(err)

        res
        .status(404)
        .json({
            success: false,
            massage: "not found",
            
        });
    }
}


// get featured tour
export const getFeaturedTour = async(req, res) => {

    try {
        const tours = await Tour.find({featured:true})
        .populate("reviews")
        .limit(8);

        res.status(200).json({
            success: true,
            
            massage: "Successful",
            data: tours})

    } catch (err) {
        res
        .status(404).json({
            success: false,
            massage: "not found",
            
        });
    }

}

// get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({ success: true, data: tourCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "failed to fetch" });
    }
}



