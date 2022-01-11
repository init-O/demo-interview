const Site=require('../models/siteModel')
const User=require('../models/userModel')

const getSiteInfo=async (req, res)=>
{
    try{
        const siteInfo=await Site.findOne()
        console.log(siteInfo)
        res.json(siteInfo)
    }
    catch(err)
    {
        console.log(err)
        res.json({message: "Site info could not be fetched"})
    }

}

const postHit=async (req, res)=>
{
    try{
        const siteInfo=await Site.findOne()
        console.log(siteInfo)
        if (siteInfo)
        {   
            console.log("Site info exists")
            siteInfo.totalViews=siteInfo.totalViews+1
            siteInfo.lastThirtyViews=siteInfo.lastThirtyViews+1
            const updatedSiteInfo=await siteInfo.save()
            res.json(updatedSiteInfo)
        }
        else
        {
            console.log("No Site info already exists so creating one now")
            const userCount=await User.countDocuments({})
            const newSiteInfo=new Site({
                totalViews: 1,
                lastThirtyViews: 1,
                totalUsers: userCount,
                lastThirtyUsers: 0
            })
            await newSiteInfo.save()
            console.log(newSiteInfo)
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports={getSiteInfo, postHit}