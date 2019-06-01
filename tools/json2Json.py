#_*_coding:utf-8_*_

# 将数组格式的json对象转换为以id为索引的map格式
import os

def scan_file(source_path, dest_path):
    print(source_path + "->" + dest_path)
    source_file = open(source_path, mode="r+", encoding='UTF-8')
    content = source_file.readlines()
    source_file.close()
    line_num = 0
    content[0] = '{\n'
    for line in content:
        p = line.find("id")
        if p != -1:
            q = line.find(',')
            if q != -1:
                id_str = line[p+5:q]
                line_str = "{"+line[q+1:]
                content[line_num] = '"' + id_str + '": ' + line_str
        line_num = line_num + 1
    content[line_num-1] = '}'
    var_name = dest_path[dest_path.rfind('/')+1:dest_path.rfind('.')]
    content.insert(0,"export var " + var_name + "=")
    dest_file = open(dest_path, mode='w', encoding='UTF-8')
    dest_file.writelines(content)
    dest_file.close()

def scan_folder(path):
    current_files = os.listdir(path)
    for file_name in current_files:
        source_path = os.path.join(path, file_name)
        # dest_path = os.path.join(path, "../../assets/Script/AutoBattle/Tbx/" + file_name)
        dest_path = "../AutoChess/assets/Script/AutoBattle/Tbx/" + file_name
        # dest_path = os.path.join(path, "../" + file_name)
        scan_file(source_path, dest_path)

print("json2json start")
scan_folder("../temp")
print("json2json end")