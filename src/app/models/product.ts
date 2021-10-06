
export interface Product {
    id: number,
    name: string,
    price: number,
    color: string,
    addedUserId: number,
    image: string,
    inStock: boolean,
    isActive: boolean,
    createdDateTime: Date,
    updatedDateTime: Date,
    categoryId: number,
    manufacturerId: number,
    categoryName: string,
    manufacturerName: string
        
}