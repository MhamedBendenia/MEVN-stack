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
                clients = await Client.find().sort({[sort_by]: sort_type});
            }else{
                clients = await Client.find();
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
            const client = await Client.findById(id).populate({ path: 'providers'});
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
        try {
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
