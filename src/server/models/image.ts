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

    @Column({ name: "is_edited", type: "boolean", default: false })
    isEdited: boolean

    @Column({ type: "text", nullable: true})
    description: string

    @Column({ type: "text", nullable: true })
    comment: string

    // Won't be included in any selects
    @Column({ type: "tsvector", select: false })
    document_with_weights: any;

    // if we wanted to join
    // @OneToOne(() => Photo)
    // @JoinColumn()
    // photo: Photo
}