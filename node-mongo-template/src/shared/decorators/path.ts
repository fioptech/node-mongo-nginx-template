export default function path() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('target', target)
        console.log('propertyKey', propertyKey)
        console.log('descriptor', descriptor)
    }
}