const emptyFunc = (pointCut?: any, result?: any, error?: any) => {
    console.log(pointCut,result,error);
};

const findPointCut = (target, pointCut) => {
    if (typeof pointCut === 'string') {
        const func = target.prototype[pointCut];
        // 暂不支持属性的aop
        if (typeof func === 'function') {
            return func;
        }
    }
    // 暂不支持模糊匹配切点
    return null;
};
const advice = (target, pointCut, adviceX: any = {}) => {
    const old = findPointCut(target, pointCut);
    if (old) {
        target.prototype[pointCut] = (...apple: any) => {
            const self = this;
            const args = apple;
            const joinPoint = {
                target,
                method: old,
                args,
                self
            };
            const { before,after, afterReturn, afterThrow } = adviceX;
            let {round} = adviceX;
            // 前置增强
            const a = before && before.call(self, joinPoint, null, null);
            console.log(a);
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
                    const shouldIntercept = afterThrow && afterThrow.call(self, joinPoint, e);
                    if (!shouldIntercept) {
                        throw e;
                    }
                } finally {
                    // 后置增强
                    result = after && after.call(self, joinPoint, result, error);
                }
            } else {
                // 未定义任何后置增强,直接执行原方法
                return round.call(self, roundJoinPoint);
            }
        };
    }
};
const aop = {
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