import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name:'yangben_serach'})
export class YangbenSearch {

    @PrimaryGeneratedColumn()
    id?:number

    @ApiProperty({description: 'classifyId1'})
    @Column({default:null})
    classifyId1?: number;

    @ApiProperty({description: '一级分类',type:'string'})
    @Column({type:"varchar",nullable: true,length:"255",default:null,comment: '一级分类'})
    classifyName1?: string;

    @ApiProperty({description: '',type:'number'})
    @Column({nullable: true,default:null})
    classifyId2?: number;

    @ApiProperty({description: '二级分类',type:'string'})
    @Column({name:"classifyName2",type:"varchar",default:null,length:"255",comment: '二级分类'})
    classifyName2?: string;

    @ApiProperty({description: '管控事件',type:'string'})
    @Column({type:"varchar", length:"255",nullable: true,default:null,comment:'管控事件'})
    name?: string;

    @ApiProperty({description: '对象id',type:'string'})
    @Column({type:"varchar",length:"255",default:null,comment: '对象id'})
    objectId?: string;

    @ApiProperty({description: '处置id'})
    @Column({name:'chuzhiId',type:'varchar',default:null,comment:'处置id'})
    chuzhiId?: string;

    @ApiProperty({description: '对象名称',type:'string'})
    @Column({type:"varchar",length:"35",nullable:true,default:null,comment: '对象名称'})
    objectName?: string;


    @ApiProperty({description: 'cz名称',type:'string'})
    @Column({type:"text",nullable:true,default:null,comment: 'cz名称'})
    chuzhiName?: string;

    @ApiProperty({description: '典型样本',type:'string'})
    @Column({name:'yangbenContent',type:"varchar",length:"255",nullable:true,default:null,comment: '典型样本'})
    yangbenContent?: string;

    @ApiProperty({description: '处置流水号',type:'string'})
    @Column({type:"varchar",length:"255",nullable:true,default:null,comment: '处置流水号'})
    seqNo?: string;

    @ApiProperty({description: '处置数量',type:'string'})
    @Column({type:"varchar",length:"255",nullable:true,default:null,comment: '处置数量'})
    chuzhiCnt?: string;
}
