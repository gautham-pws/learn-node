const mongoose = require("mongoose");

const uri =
  "mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/api-asn?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);
