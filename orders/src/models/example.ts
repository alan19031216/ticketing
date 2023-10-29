import mongoose from "mongoose";

interface ExampleAttrs {

}

interface ExampleDoc extends mongoose.Document {

}

interface ExampleModel extends mongoose.Model<ExampleDoc> {

}