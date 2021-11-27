
    /**
     * @swagger
     * /provider:
     *   get:
     *     summary: Get providers list
     *     description: Get all providers.
     *     tags:
     *       - Provider
     *     responses:
     *       200:
     *         description: Returns a list of all providers.
     *       404:
     *         description: Not found.
     *   
     *   post:
     *     summary: Create new provider
     *     description: Create new provider.
     *     tags:
     *       - Provider
     *     parameters:
     *      - in: body
     *        name: Provider object
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/provider?name=John
     *        required: true
     *        description: The provider object contains the name.
     *     responses:
     *       201:
     *         description: Provider created successfully.
     *       400:
     *         description: Error.
     * 
     * /provider/{_id}:
     *   get:
     *     summary: Get provider by id
     *     description: Get provider by id.
     *     tags:
     *       - Provider
     *     parameters:
     *      - in: path
     *        name: _id
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/provider/<provider_id>
     *        required: true
     *        description: The id is a unique value that define each Provider.
     *     responses:
     *       200:
     *         description: Returns the provider data.
     *       404:
     *         description: Not found.
     * 
     *   patch:
     *     summary: Update provider data
     *     description: Update the given provider id data.
     *     tags:
     *       - Provider
     *     parameters:
     *      - in: path
     *        name: _id
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/provider/<provider_id>
     *        required: true
     *        description: The id is a unique value that define each Provider.
     *      - in: body
     *        name: Provider object
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/provider/<provider_id>?name=John
     *        required: true
     *        description: The provider object contains the name.
     *     responses:
     *       200:
     *         description: Provider updated successfully.
     *       404:
     *         description: Not found.
     */

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