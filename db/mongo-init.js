db.createCollection("api_gerenciamento");
db = db.getSiblingDB("api_gerenciamento");
db.createUser({
    user: 'apiuser',
    pwd: 'OnMchiATNR3yW0Y9M8LnHtc07tUXbawn',
    roles: [
        { role: "readWrite", db: "api_gerenciamento" }
    ]
});