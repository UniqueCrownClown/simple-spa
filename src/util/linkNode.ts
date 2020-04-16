export const getLinkNode = (str: string, result: any) => {
    if (str.length > 1) {
        result.val = str.substr(0, 1);
        result .next = {};
        getLinkNode(str.substr(1, str.length), result.next)
    } else {
        result.val = str.substr(0, 1);
        result .next = null;
    }
}