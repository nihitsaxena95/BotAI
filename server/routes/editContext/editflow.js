let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session(); //config file


export default(object,context)=>{
    /*======================Query to add flow to context===========================*/
    object.map((intent) =>{
        if(intent.deleteFlow === false) {
            const resultPromise = session.run("MATCH (ee:"+context.label+" { name : '"+context.itemName+"' })-[:"+intent.name+"]->(xx) merge (xx)-[:answer]->(ff:Counter {name : '"+intent.flow+"', value : '"+intent.flow+"'}) return ee,ff,xx");
            resultPromise.then(result => {
                let flow = result.records;
            });
        }

        else if(intent.deleteFlow === true){
            const resultPromise = session.run("MATCH (ee:"+context.label+" { name : '"+context.itemName+"' })-[:"+intent.name+"]->(xx)-[ans:answer]->(ff:Counter {name : '"+intent.hiddenFlow+"', value : '"+intent.hiddenFlow+"'}) detach delete ans,ff");
            resultPromise.then(result => {
                let flow = result.records;
            });
        }
    });
};