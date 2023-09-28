import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client";

export enum TransactionTypes{
   DEPOSIT="deposit",
   WITHDRAW="withraw"

}

@Entity("transactions")
export class Transaction {


    @PrimaryGeneratedColumn("uuid")
    id:number

    @Column()
    amount:number

    @Column({
        type:"enum",
        enum:TransactionTypes

    })
    type:string

    @Column({ type: 'date' ,
    default: () => 'NOW()' })
    transaction_date: string;
  
    @CreateDateColumn()
    created_at:Date

    @ManyToOne(()=>Client,(client) => client.transactions )
    @JoinColumn({name:'client_id'})
    client:Client


}