import mongoose from "mongoose"
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { OrderCancelledEvent, OrderStatus } from "@alanwkorganization/common"
import { Order } from "../../../models/order"

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const orderId = new mongoose.Types.ObjectId().toHexString()
    const order = Order.build({
        id: orderId,
        status: OrderStatus.Created,
        price: 10,
        userId: 'userid',
        version: 0
    })

    await order.save()

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: 'asda',
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, order }
}

it('updates the ticket, published an event, and acks the message', async () => {
    const { msg, data, order, listener } = await setup()

    await listener.onMessage(data, msg)

    const updateOrder = await Order.findById(order.id)
    expect(updateOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})