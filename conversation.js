class Conversation {
    /**
     * 
     * @param {Array} userList - The list of conversation participants.
     */
    constructor(userList = new Array(), isPrivate = false) {
        this.userList = userList;
        this.host = userList[0];
        this.duration = 0;
        this.volume = 0;
        this.messageQueue = new Array();
        this.isPrivate = isPrivate;
    }
    /**
     * Adds several users to process messages from.
     * @param {Array} additionList - A list of users to join the conversation.
     */
    add_users(additionList) {
        this.userList = this.userList.concat(additionList);
    }
    /**
     * Excludes several users from message processing.
     * @param {Array} removalList - A list of users to remove from the conversation.
     */
    remove_users(removalList) {
        this.userList = this.userList.filter(user => !removalList.includes(user));
    }
    /**
     * Adds a message to process.
     * @param {string} message - A message to add to conversation's queue.
     */
    queue_message(message) {
        this.volume++;
        this.messageQueue.push(message);
    }
}

module.exports = Conversation;