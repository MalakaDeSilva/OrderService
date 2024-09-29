const { dynamoClient } = require("../config");
const { v4: uuidv4 } = require("uuid");

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, items, totalPrice } = req.body;

  const params = {
    TableName: process.env.DYNAMODB_TABLE_ORDERS,
    Item: {
      id: uuidv4(),
      userId,
      items,
      totalPrice,
      orderStatus: "PENDING",
      deliveryId: null,
      deliveryStatus: "NOT_DISPATCHED",
    },
  };

  try {
    await dynamoClient.put(params).promise();
    res
      .status(201)
      .send({ message: "Order created successfully", order: params.Item });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to create order", details: error.message });
  }
};

// Get an order by ID
exports.getOrder = async (req, res) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_ORDERS,
    Key: {
      id: req.params.orderId,
    },
  };

  try {
    const data = await dynamoClient.get(params).promise();
    if (!data.Item) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.send(data.Item);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to get order", details: error.message });
  }
};

// Update order status
exports.updateOrder = async (req, res) => {
  const { orderStatus } = req.body;

  const params = {
    TableName: process.env.DYNAMODB_TABLE_ORDERS,
    Key: {
      id: req.params.orderId,
    },
    UpdateExpression: "set orderStatus = :status",
    ExpressionAttributeValues: {
      ":status": orderStatus,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await dynamoClient.update(params).promise();
    res.send({ message: "Order updated", updatedAttributes: data.Attributes });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to update order", details: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_ORDERS,
    Key: {
      id: req.params.orderId,
    },
  };

  try {
    await dynamoClient.delete(params).promise();
    res.send({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete order", details: error.message });
  }
};
