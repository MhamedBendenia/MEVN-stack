const Provider = require('../models/provider');

module.exports = class API {

    // fetch the providers list
    static async fetchAllProviders(req, res){
        try {
            let providers = null;
            // parameters for sorting the results
            if(req.query["sort-by"] != null){
                const sort_by = req.query["sort-by"].substring(1);
                const sort_type = (req.query["sort-by"][0] == "-" ? -1 : 1);
                providers = await Provider.find().sort({[sort_by]: sort_type});
            }else{
                providers = await Provider.find();
            }
                    
            res.status(200).json(providers);

        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    // fetch provider by id
    static async fetchProviderById(req, res){
        const id = req.params.id
        try {
            const provider = await Provider.findById(id);
            res.status(200).json(provider);
        } catch (err) {
            res.status(404).json({message: err.message});
        }        
    }

    // add a provider
    static async addProvider(req, res){
        const provider = req.query;
        try {
            await Provider.create(provider);
            res.status(201).json({ message: "Provider created successfully!" });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    
    // edit provider
    static async updateProvider(req, res){
        const id = req.params.id;
        const provider = req.query;
        try {
            await Provider.findByIdAndUpdate(id, provider);
            res.status(200).json({ message: "Provider updated successfully!" });
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    // delete provider
    static async deleteProvider(req, res){
        const id = req.params.id;
        try {
            await Provider.findByIdAndDelete(id);
            res.status(200).json({ message: "Provider deleted successfully!" });
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }
}