import ast
import traceback


class Utility:

    @staticmethod
    def flatten(config, prefix=''):
        data = {}
        for key in config.keys():
            if isinstance(config[key], dict):
                data.update(Utility.flatten(config[key], prefix + key + "/"))
            else:
                data[prefix + key] = config[key]
        return data

    @staticmethod
    def eval_condition(condition):
        try:
            node = ast.parse(condition)
            return Utility.eval_node(node)
        except:
            traceback.print_exc()
            pass
        return False

    @staticmethod
    def eval_node(node):
        if type(node) == ast.Module:
            assert len(node.body) == 1
            return Utility.eval_node(node.body[0])
        elif type(node) == ast.Expr:
            return Utility.eval_node(node.value)
        elif type(node) == ast.BoolOp:
            values = []
            for value in node.values:
                values.append(Utility.eval_node(value))

            if node.op == ast.And:
                return all(values)
            elif node.op == ast.Or:
                return any(values)
            else:
                raise Exception(str(node))
        elif type(node) == ast.Compare:
            left = Utility.eval_node(node.left)
            comparators = []
            for c in node.comparators:
                comparators.append(Utility.eval_node(c))

            assert len(node.ops) == 1
            if type(node.ops[0]) == ast.Eq:
                return left == comparators[0]
            elif type(node.ops[0]) == ast.Lt:
                return left < comparators[0]
            elif type(node.ops[0]) == ast.LtE:
                return left <= comparators[0]
            elif type(node.ops[0]) == ast.Gt:
                return left > comparators[0]
            elif type(node.ops[0]) == ast.GtE:
                return left >= comparators[0]
            else:
                raise Exception(str(node))
        elif type(node) == ast.Num:
            return node.n
        elif type(node) == ast.Str:
            return node.s
        else:
            raise Exception(str(node))