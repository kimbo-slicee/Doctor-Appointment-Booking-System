// API For Adding Doctors
const addDoctor=async (req,res)=>{
    try{
       const {
            name,
            email,
            phone,
            password,
            image,
            speciality,
            experience,
            about,
            available,
            fees,
            address,
            date}=req.body
        const filename=req.file;
        console.log(req.body);
        console.log();
        res.status(200).json({...req.body})
    }catch (error){
        console.log(error)
    }
}
export {
    addDoctor
}