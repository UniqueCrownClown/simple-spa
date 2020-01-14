let emptyFunc = (pointCut?: any, result?: any, error?: any) => {
};

let findPointCut = (target, pointCut) => {
    if (typeof pointCut === 'string') {
        let func = target.prototype[pointCut];
        // 暂不支持属性的aop
        if (typeof func === 'function') {
            return func;
        }
    }
    // 暂不支持模糊匹配切点
    return null;
};
let advice = (target, pointCut, advice: any = {}) => {
    let old = findPointCut(target, pointCut);
    if (old) {
        target.prototype[pointCut] = function () {
            let self = this;
            let args = arguments;
            let joinPoint = {
                target,
                method: old,
                args,
                self
            };
            let { before, round, after, afterReturn, afterThrow } = advice;
            // 前置增强
            before && before.call(self, joinPoint, null, null);
            // 环绕增强
            let roundJoinPoint = joinPoint;
            if (round) {
                roundJoinPoint = Object.assign(joinPoint, {
                    handle: () => {
                        return old.apply(self, args);
                    }
                });
            } else {
                // 没有声明round增强,直接执行原方法
                round = () => {
                    old.apply(self, args);
                };
            }


            if (after || afterReturn || afterThrow) {
                let result = null;
                let error = null;
                try {
                    result = round && round.apply(self, roundJoinPoint);
                    // 返回增强
                    return afterReturn && afterReturn.call(self, joinPoint, result) || result;
                } catch (e) {
                    error = e;
                    // 异常增强
                    let shouldIntercept = afterThrow && afterThrow.call(self, joinPoint, e);
                    if (!shouldIntercept) {
                        throw e;
                    }
                } finally {
                    // 后置增强
                    after && after.call(self, joinPoint, result, error);
                }
            } else {
                // 未定义任何后置增强,直接执行原方法
                return round.call(self, roundJoinPoint);
            }
        };
    }
};

let aop = {
    before(target, pointCut, before = emptyFunc) {
        advice(target, pointCut, { before });
    },
    after(target, pointCut, after = emptyFunc) {
        advice(target, pointCut, { after });
    },
    afterReturn(target, pointCut, afterReturn = emptyFunc) {
        advice(target, pointCut, { afterReturn });
    },
    afterThrow(target, pointCut, afterThrow = emptyFunc) {
        advice(target, pointCut, { afterThrow });
    },
    round(target, pointCut, round = emptyFunc) {
        advice(target, pointCut, { round });
    }
};

export default aop;