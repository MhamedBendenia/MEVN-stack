
    /**
     * @swagger
     * /client:
     *   get:
     *     summary: Get clients list
     *     description: Get all clients and sort them by name, email, and phone.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: body
     *        name: sort-by
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client?sort-by=-name
     *        required: false
     *        description: The sorting parameter, it can be name, email, or phone. It has to be preceded with "-" for descending and "+" for ascending.
     *     responses:
     *       200:
     *         description: Returns a list of all clients.
     *       404:
     *         description: Not found.
     *   
     *   post:
     *     summary: Create new client
     *     description: Create new client.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: body
     *        name: Client object
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client?name=John&email=john@test.com&phone=0555555555
     *        required: true
     *        description: The client object contains name, email, and phone.
     *     responses:
     *       201:
     *         description: Client created successfully.
     *       400:
     *         description: Error.
     * 
     * /client/{_id}:
     *   get:
     *     summary: Get client by id
     *     description: Get client by id.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: path
     *        name: _id
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client/<client_id>
     *        required: true
     *        description: The id is a unique value that define each Client.
     *     responses:
     *       200:
     *         description: Returns the client data.
     *       404:
     *         description: Not found.
     * 
     *   patch:
     *     summary: Update client data
     *     description: Update the given client id data.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: path
     *        name: _id
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client/<client_id>
     *        required: true
     *        description: The id is a unique value that define each Client.
     *      - in: body
     *        name: Client object
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client/<client_id>?name=John&email=john@test.com&phone=0555555555
     *        required: true
     *        description: The client object contains name, email, and phone.
     *     responses:
     *       200:
     *         description: Client updated successfully.
     *       404:
     *         description: Not found.
     * 
     * /client/attach:
     *   post:
     *     summary: Attach provider to client
     *     description: Get provider by id and attach it to the given client.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: body
     *        name: client and provider ids
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client/attach?client_id=<client_id>&provider_id=<provider_id>
     *        required: true
     *     responses:
     *       200:
     *         description: Provider attached successfully.
     *       400:
     *         description: Error.
     * 
     * /client/detach:
     *   post:
     *     summary: Detach provider from client
     *     description: Get provider by id and detach it from the given client.
     *     tags:
     *       - Client
     *     parameters:
     *      - in: body
     *        name: client and provider ids
     *        schema:
     *          type: string
     *          example: http://localhost:5000/api/client/detach?client_id=<client_id>&provider_id=<provider_id>
     *        required: true
     *     responses:
     *       200:
     *         description: Provider detached successfully.
     *       400:
     *         description: Error.
     */

const Client = require('../models/client');

module.exports = class API {

    // fetch the clients list
    static async fetchAllClients(req, res){
        try {
            let clients = null;
            // parameters for sorting the results
            if(req.query["sort-by"] != null){
                const sort_by = req.query["sort-by"].substring(1);
                const sort_type = (req.query["sort-by"][0] == "-" ? -1 : 1);
                clients = await Client.find().populate('providers').sort({[sort_by]: sort_type});
            }else{
                clients = await Client.find().populate('providers');
            }
                    
            res.status(200).json(clients);

        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // fetch client by id
    static async fetchClientById(req, res){
        const id = req.params.id
        try {
            const client = await Client.findById(id).populate('providers');
            res.status(200).json(client);
        } catch (err) {
            res.status(404).json({message: err.message});
        }        
    }

    // add a client
    static async addClient(req, res){
        const client = req.query;
        try {
            await Client.create(client);
            res.status(201).json({ message: "Client created successfully!" });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    
    // edit client
    static async updateClient(req, res){
        const id = req.params.id;
        const client = req.query;
        delete client["providers"];
        try {
            await Client.findByIdAndUpdate(id, { $set: { providers: [] } });
            await Client.findByIdAndUpdate(id, client);
            res.status(200).json({ message: "Client updated successfully!" });
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    // delete client
    static async deleteClient(req, res){
        const id = req.params.id;
        try {
            await Client.findByIdAndDelete(id);
            res.status(200).json({ message: "Client deleted successfully!" });
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    // attach provider to client
    static async attachProviderToClient(req, res){
        const client_id = req.query["client_id"];
        const provider_id = req.query["provider_id"];
        try {
            await Client.findByIdAndUpdate(client_id, { $push: { providers: provider_id } });
            res.status(200).json({ message: "Provider attached successfully!" });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    // detach provider from client
    static async detachProviderFromClient(req, res){
        const client_id = req.query["client_id"];
        const provider_id = req.query["provider_id"];
        try {
            await Client.findByIdAndUpdate(client_id, { $pull: { providers: provider_id } });
            res.status(200).json({ message: "Provider detached successfully!" });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}
