const wordsearch = (model) =>  async (req, res, next)=> {
    
    model.find({email : { "$regex": req.params.word, "$options": "i" } },
    function(err,docs) { 
        if(err) throw new Error("no records found")
        res.json({data:docs});
    });

}
module.exports = wordsearch;