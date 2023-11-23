
const  { botMessage } = require("./controllers/botController")

makeSocketConnection = (socketIO,OpenAI)=>{
    socketIO.on('connection', (socket) => {
        console.log("User Connected")
    

        
        socket.on("message_from_client", (data)=>{

            console.log("Human Asked", data)
            
            //Connection to the OpenAI
            async function main() {
                const completion = await OpenAI.chat.completions.create({
                  messages: [{ role: "system", content: data.message }],
                  model: "gpt-3.5-turbo",
                });
              
                console.log(completion.choices[0]);
                let reply = completion.choices[0]
                
                // let reply = {"message": {
                //     "role": 'assistant',
                //     "content": 'Lady finger is a type of small, elongated, and slender variety of sweet pepper. It is also known as okra or bhindi in some parts of the world. Lady finger is often used in Indian, Middle Eastern, and African cuisines and is known for its unique taste and texture. It can be used in a variety of dishes, including curries, stews, pickles, and stir-fries. Lady finger is low in calories and high in fiber, making it a healthy addition to any diet.'
                //   }}

                let response = botMessage({"message":reply.message.content, "conv_id":data.conversationId})

                if(reply){
                    socket.emit("message_from_server", reply)
                }else{
                    socket.emit("message_from_server", {})
                }
            }
              
            main();
        })

        socket.on('disconnect', ()=>{
            console.log("User Disconnected");
        })
    })
}
module.exports = makeSocketConnection