// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


struct Value {
    address writer;
    string value;
    bool exists;
}

contract Messages {
    //mapping型
    mapping (string=>Value) MessageList; //kvs
    //固定サイズを持たないstring型配列
    string[] messages; //keys

    constructor() {
        // 何もしない
    }

    function write(string memory message, string memory value) public {
        if (MessageList[message].exists) {
            //require文：制約
            //第一引数：偽だと処理が止まる
            //第二引数：その場合のエラーメッセージ
            require(MessageList[message].writer == msg.sender, "No permission");
        }

        MessageList[message] = Value(msg.sender, value, true);
        messages.push(message);
        emit WroteEvent(message, MessageList[message]);
    }

    function read(string memory message) view public returns (Value memory) {
        Value memory result = MessageList[message];
        require(result.exists, "Doesn't exists");
        return result;
    }

    function del(string memory message) public {
        require(MessageList[message].exists, "Doesn't exist");
        require(MessageList[message].writer == msg.sender, "No permission");

        MessageList[message].exists = false;
        emit DeleteEvent(message);
    }

    function getKeys() view public returns (string[] memory) {
        uint count = 0;
        for (uint i = 0; i < messages.length; i++) {
            if (MessageList[messages[i]].exists) {
                count++;
            }
        }
        string[] memory result = new string[](count);

        uint index = 0;
        for (uint i = 0; i < messages.length; i++) {
            if (MessageList[messages[i]].exists) {
                result[index] = messages[i];
                index++;
            }
        }

        return result;
    }
}

event WroteEvent(string indexed key, Value val);
event DeleteEvent(string indexed key);
