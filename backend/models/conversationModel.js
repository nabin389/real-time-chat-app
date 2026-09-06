import mongoose from "mongoose";

// this one process is only for two user and for next two user (next time) complete process created next time
const conversationModel = new mongoose.Schema({
    participants:[({ // overall it stores only two id one tile 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    })], //it is array
    messages:[{ // it stores message id of above two participant id because for other two user same process created next time
        // and another thing is that for two user there can be multiple message id that can store here in this messages field
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
},{
    timestamps: true
});
export const Conversation = mongoose.model("Conversation", conversationModel);