import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('delete the order', async () => {
    const ticket = Ticket.build(({
        title: "A",
        price: 20,
        id: new mongoose.Types.ObjectId().toHexString()
    }))

    await ticket.save()

    const user = global.signin()

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)

    await request(app)
        .delete('/api/orders/' + order.id)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id)

    expect(order.id).toEqual(updatedOrder!.id)
})

it('emits an order cancelled event', async () => {
    const ticket = Ticket.build(({
        title: "A",
        price: 20,
        id: new mongoose.Types.ObjectId().toHexString()
    }))

    await ticket.save()

    const user = global.signin()

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)

    await request(app)
        .delete('/api/orders/' + order.id)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id)

    expect(order.id).toEqual(updatedOrder!.id)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})