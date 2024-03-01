import mongoose, { Schema, model, Document } from 'mongoose';


interface IEmployee extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  address?: string;
  dateJoined: Date;
  isBlocked: boolean;
}


const employeeSchema = new Schema<IEmployee>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    required:true,
    trim: true,
    unique:true,
    sparse: true, // Allow multiple null values
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  address: {
    type: String
  },
  password: {
    type: String,
    required:true,
    minlength: 8
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});


const Employees = model<IEmployee>('Employees', employeeSchema, 'employees');

export default Employees;