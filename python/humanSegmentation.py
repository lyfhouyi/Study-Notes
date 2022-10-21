import os, paddlehub as hub
import re
humanseg = hub.Module(name='deeplabv3p_xception65_humanseg')

path = '/Users/e.hou/git/Study-Notes/asset/'
files = [path + i for i in os.listdir(path)]

# results = humanseg.segmentation(data={'image':files},visualization=True, output_dir='humanseg_output')
results = humanseg.segmentation(paths=['/Users/e.hou/Downloads/yhy.jpg'],visualization=True, output_dir='humanseg_output')
