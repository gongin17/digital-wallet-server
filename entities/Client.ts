import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,ManyToMany } from "typeorm"
import { Transaction } from "./Transaction"
import { Banker } from "./Banker"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    balance: number
    @Column({
        nullable: true
    })
    username: string

    @Column({
        nullable: true
    })
    firstName: string

    @Column({
        nullable: true
    })
    lastName: string
    
    @Column({
        nullable: true
    })
    email: string

    @Column({
        nullable: false
    })
    password: string


    @OneToMany(()=>Transaction, transaction =>transaction.client)
    transactions:Transaction[]

    @ManyToMany(
        ()=>Banker
    )
    bankers:Banker[]
}