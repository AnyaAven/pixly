import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm"

//https://typeorm.io/
@Entity()
export class Image extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    filename: string

    @Column("int")
    height: number

    @Column("int")
    width: number

    @Column("text")
    orientation: string

    @Column({ name: "is_editted", type: "boolean", default: false })
    isEditted: boolean

    @Column({ type: "text", nullable: true})
    description: string

    @Column({ type: "text", nullable: true })
    comment: string


    // if we wanted to join
    // @OneToOne(() => Photo)
    // @JoinColumn()
    // photo: Photo
}