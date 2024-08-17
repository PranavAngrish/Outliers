


export const getExperiencesList = async (req, res) => {
    try{
        const experiences = await AcceptedExperience.find().populate('vendor','')

    }catch(e){

    }
}