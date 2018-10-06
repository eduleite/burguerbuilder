export function updateObject(oldObject, updatedProperties) {
    return {
        ...oldObject,
        ...updatedProperties
    };
}