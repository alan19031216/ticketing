import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
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

    const { body: fetchOrder } = await request(app)
        .get('/api/orders/' + order.id)
        .set('Cookie', user)
        .send()
        .expect(200)

    expect(fetchOrder.id).toEqual(order.id)
})

it('returns an error user not authorize', async () => {
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
        .get('/api/orders/' + order.id)
        .set('Cookie', global.signin())
        .send()
        .expect(401)
})